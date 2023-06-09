import ApexChart from "react-apexcharts";
import { IHistorical } from "../routes/interface";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IProps {
  data: IHistorical | undefined;
}

function CandlestickChart({ data }: IProps) {
  const datas = data?.Data.Data;
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ApexChart
      type="candlestick"
      series={[
        {
          name: "Price",
          data:
            datas?.map(priceInfo => {
              const obj = {
                x: new Date(priceInfo.time * 1000),
                y: [Number(priceInfo.open), Number(priceInfo.high), Number(priceInfo.low), Number(priceInfo.close)],
              };
              return obj;
            }) ?? [],
        },
      ]}
      options={{
        theme: {
          mode: isDark ? "dark" : "light",
        },
        yaxis: {
          show: true,
          labels: {
            formatter: value => {
              return value.toFixed(0);
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories: datas?.map(time => time.time * 1000),
        },
        chart: {
          toolbar: { show: true },
          width: 500,
          height: 300,
          background: "transparent",
        },
      }}
    />
  );
}

export default CandlestickChart;
