import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

let beneficios = [1000, 1200, 1000, 4000, 2000, 3000, 5000, 10000, 1000, 1220, 4000, 5000, 4000];
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let midata = {
    labels: meses,
    datasets: [ 
        {
            label: 'Sueldo',
            data: beneficios,
            tension: 0.5,
            fill : true,
            borderColor: 'rgba(100, 140, 255,1 )',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 0, 0, 0)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        },
        {
            label: 'Descuentos',
            data: [500, 700, 600, 1000, 4050, 1000, 10, 250, 3500, 6000, 200, 2500],
            borderColor: 'rgba(100, 100, 100, .2 )',
            pointRadius: 5,
            tension: 0.6,
            pointBorderColor: 'rgba(255, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 255, 0)',
        },
    ],
};

let misoptions = {
    maintainAspectRatio: false,
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'rgb(0, 0, 132)'}
            
        }
    }
};

export function LinesChart() {
    return (
        <div className='pt-1 shadow-xl h-[100%] border border-gray-300 rounded-lg'>
            <Line data={midata} options={misoptions}/>
        </div>
    )
}