import { Doughnut } from 'react-chartjs-2';

export const Date_Finanzas = () => {

    const data = {
        labels: ['Azul', 'Blanco'],
        datasets: [
          {
            data: [70, 30, 50],
            backgroundColor: ['#AD66f1', '#AA814F', "#403fad"],
            hoverBackgroundColor: ['#818cf8', '#AA514F', "#403fad"],
          },
        ],
      };

    const options = {
        
    };

    return (
        <div className="flex border border-gray-300 rounded-lg shadow-xl">
            <div className='flex-grow p-3 pt-2'>
                <h3 className="font-bold text-[1.2rem] pb-4">Finanzas</h3>
                <p className="text-[13px] text-gris">Datos de Finanzas</p>
                <h4 className="font-bold text-indigo-500 text-[1.3rem] py-3">$5,240</h4>
                <p className="text-[13px] text-gris">May 28 - June 01</p>
                <p className="text-[13px] text-gris">(2018)</p>
            </div>
            <div className='m-0 pb-2'>
            <Doughnut data={data} options={options} width={300}/>
            </div> 
        </div>
    );
}



