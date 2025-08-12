import type { ApexOptions } from "apexcharts";
import type { Budget } from "../../types/budget";
import { useEffect, useMemo, useState } from "react";
import type { Expense } from "../../types/expense";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts"; // <-- important pour ApexCharts.exec

interface DoughnutDetailsProps {
  expenses: Expense[];
  budget: Budget;
}

export const DoughnutDetails: React.FC<DoughnutDetailsProps> = ({
  expenses,
  budget,
}) => {
  const [series, setSeries] = useState<number[]>([]);
  const [options, setOptions] = useState<ApexOptions>({});

  // id unique par budget pour targeter ApexCharts.exec
  const chartId = `budget-donut-${budget.id}`;

  // calculer uniquement le total dépensé pour ce budget (memo pour éviter re-runs inutiles)
  const spentAmountForBudget = useMemo(() => {
    return expenses
      .filter((e) => e.budget_id === budget.id)
      .reduce((total, e) => total + Number(e.amount || 0), 0);
  }, [expenses, budget.id]);

  useEffect(() => {
    const allocated_amount = Number(budget.allocated_amount) || 0;
    const spent_amount = Number(spentAmountForBudget) || 0;
    const remainingBudget = allocated_amount - spent_amount;
    const overBudget = remainingBudget < 0;

    const safeSpent = Math.min(spent_amount, allocated_amount);
    const overAmount = Math.max(spent_amount - allocated_amount, 0);
    const safeRemaining = Math.max(allocated_amount - spent_amount, 0);

    const newSeries = overBudget ? [overAmount, allocated_amount] : [safeSpent, safeRemaining];

    // Normalize color (assure qu'il y ait un '#...' au besoin)
    const normalize = (c?: string) => {
      if (!c) return "#A5D8FF";
      return c.startsWith("#") ? c : c;
    };

    const newColors = overBudget ? ["#fff", "#FF4560"] : ["#fff", normalize(budget.color)];

    const newOptions: ApexOptions = {
      chart: {
        id: chartId,
        type: "donut",
      },
      labels: overBudget ? ["", "Dépassement"] : ["", "Restant"],
      colors: newColors,
      stroke: {
        show: true,
        colors: ["transparent", "black"],
        width: 1,
      },
      legend: {
        position: "bottom",
        offsetX: -50,
      },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "16px",
                color: "#000",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "14px",
                color: remainingBudget < 0 ? "#ef4444" : "#8c8c8c",
                offsetY: 30,
                formatter: () => `${remainingBudget.toFixed(2)} € / ${allocated_amount} €`,
              },
              total: {
                show: true,
                label: "",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#666",
                formatter: () => `${remainingBudget.toFixed(2)} € / ${allocated_amount} €`,
              },
            },
          },
        },
      },
    };

    // mettre à jour l'état local (pour ReactApexChart si il l'utilise)
    setSeries(newSeries);
    setOptions(newOptions);

    // helper retry pour appeler ApexCharts.exec une fois le chart monté
    const tryUpdate = async (attempt = 0) => {
      if (typeof ApexCharts?.exec !== "function") {
        if (attempt < 6) {
          setTimeout(() => tryUpdate(attempt + 1), 60);
        } else {
          console.warn("ApexCharts.exec not available after retries");
        }
        return;
      }

      try {
        // updateOptions peut aussi inclure la série — on force un redraw complet (true)
        await ApexCharts.exec(
          chartId,
          "updateOptions",
          { colors: newColors, series: newSeries },
          /* redrawPaths */ true,
          /* animate */ true,
          /* updateSyncedCharts */ true
        );
        // fallback: updateSeries explicit (si besoin)
        await ApexCharts.exec(chartId, "updateSeries", newSeries, true);
        console.debug(`[ApexCharts] updated chart ${chartId}`, { newColors, newSeries });
      } catch (err) {
        if (attempt < 6) {
          setTimeout(() => tryUpdate(attempt + 1), 80);
        } else {
          console.error(`[ApexCharts] failed to update chart ${chartId}`, err);
        }
      }
    };

    // schedule update après render
    setTimeout(() => tryUpdate(), 0);
  }, [chartId, budget.allocated_amount, budget.color, spentAmountForBudget]);

  return (
    <div>
      <h2 className="text-xl font-semibold flex justify-center -mt-2">{budget.name}</h2>
      <ReactApexChart
        key={`${chartId}-${budget.color}-${series.join(",")}`}
        options={options}
        series={series}
        type="donut"
        width="350"
      />
    </div>
  );
};

export default DoughnutDetails;