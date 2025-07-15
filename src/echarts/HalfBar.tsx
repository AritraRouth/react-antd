import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const HalfBar: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    const option = {
   tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      // adjust the start and end angle
      startAngle: 180,
      endAngle: 360,
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
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

export default HalfBar;
