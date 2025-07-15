import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Bar: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    myChart.setOption(option);

    const resizeObserver = new ResizeObserver(() => {
      myChart.resize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      myChart.dispose();
      resizeObserver.disconnect();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "50%", height: "300px" }} />;
};

export default Bar;
