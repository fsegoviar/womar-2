import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type PropsPie = {
  pieData: any[];
};

type DataReduce = {
  cantidad: number;
  nombreCategoria: string;
};

export const PieChart = ({ pieData }: PropsPie) => {
  let key: string[] = [];
  let keyData: number[] = [];

  console.log(pieData);

  const labelsData = pieData.reduce((prev: DataReduce, curr: DataReduce) => {
    if (prev.nombreCategoria !== undefined) {
      key.push(prev.nombreCategoria);
    }

    key.push(curr.nombreCategoria);

    return key;
  });

  const dataPieChart = pieData.reduce((prev: DataReduce, curr: DataReduce) => {
    if (prev.cantidad !== undefined) {
      keyData.push(prev.cantidad);
    }

    keyData.push(curr.cantidad);

    return keyData;
  });

  console.log(labelsData, dataPieChart);

  const dataPie = {
    labels: labelsData,
    datasets: [
      {
        data: dataPieChart,
        backgroundColor: ['#07BC77', '#FBB83C', '#0380CD', '#C6433D']
      }
    ]
  };

  return (
    <>
      <Pie data={dataPie} />
    </>
  );
};
