
const db = require('../elephantsql');

const format = (results, Total) => {
    return results.rows.map((i)=>{

        return{
        "Municipios": i.Municipios,
        Abigeato: {
            total: i.Abigeato,
            perc: ((i.Abigeato*100)/ Total.Abigeato).toFixed(3) + '%'
        },
        "Delitos Relacionados Com Armas e Munições": {
            total: i.DelitosRelacionadosComArmasMunicoes,
            perc: ((i.DelitosRelacionadosComArmasMunicoes*100)/ Total.DelitosRelacionadosComArmasMunicoes).toFixed(3) + '%'
        },
        "Posse de Entorpecentes": {
            total: i.EntorpecentesPosse,
            perc: ((i.EntorpecentesPosse*100)/ Total.EntorpecentesPosse).toFixed(3) + '%'
        },
        "Tráfico de Entorpecentes": {
            total: i.EntorpecentesTrafico,
            perc: ((i.EntorpecentesTrafico*100)/ Total.EntorpecentesTrafico).toFixed(3) + '%'
        },
        "Estelionato": {
            total: i.Estelionato,
            perc: ((i.Estelionato*100)/ Total.Estelionato).toFixed(3) + '%'
        },
        "Furto de Veiculo":{
            total: i.FurtoDeVeiculo,
            perc: ((i.FurtoDeVeiculo*100)/ Total.FurtoDeVeiculo).toFixed(3) + '%'
        },
        "Furtos": {
            total: i.Furtos,
            perc: ((i.Furtos*100)/ Total.Furtos).toFixed(3) + '%'
        },
        "Homicidio Doloso":  {
            total: i.HomicidioDoloso,
            perc: ((i.HomicidioDoloso*100)/ Total.HomicidioDoloso).toFixed(3) + '%'
        },
        "Latrocinio": {
            total: i.Latrocinio,
            perc: ((i.Latrocinio*100)/ Total.Latrocinio).toFixed(3) + '%'
        },
        
        "Roubo de Veiculo": {
            total: i.RouboDeVeiculo,
            perc: ((i.RouboDeVeiculo*100)/ Total.RouboDeVeiculo).toFixed(3) + '%'
        },
        "Roubos": {
            total: i.Roubos,
            perc: ((i.Roubos*100)/ Total.Roubos).toFixed(3) + '%'
        },
        "Total de Vitimas de Homicidio Doloso": {
            total: i.TotalDeVitimasDeHomicidioDoloso,
            perc: ((i.TotalDeVitimasDeHomicidioDoloso*100)/ Total.TotalDeVitimasDeHomicidioDoloso).toFixed(3) + '%'
        },
        "Total de Vitimas de Latrocinio": {
            total: i.VitimasDeLatrocinio,
            perc: ((i.VitimasDeLatrocinio*100)/ Total.VitimasDeLatrocinio).toFixed(3) + '%'
        },
        "Vitimas de Lesão Corporal Seguida de Morte": {
            total: i.VitimasDeLesaoCorpSegMorte,
            perc: ((i.VitimasDeLesaoCorpSegMorte*100)/ Total.VitimasDeLesaoCorpSegMorte).toFixed(3) + '%'
        },
    
    }
    
    });
}

module.exports = {
   

    async get(request, response){
        var data = await db.query('SELECT "Data" FROM "public"."indicesCriminais" LIMIT 1 ');
        data = data.rows.map((i)=>{return i.Data})[0];

        var Total = await db.query('SELECT * FROM "public"."indicesCriminais" WHERE "Municipios" = \'Total RS\' LIMIT 1 ');
        Total = Total.rows[0];

        const { city } = request.params;

        var select;

        if(city)
            select = `SELECT * FROM "public"."indicesCriminais" WHERE "Municipios" != \'Total RS\' AND "Municipios" LIKE \'%${city.toUpperCase()}%\'`;
        else
            select = 'SELECT * FROM "public"."indicesCriminais" WHERE "Municipios" != \'Total RS\' ';

        var results = await db.query(select);
        results = format(results, Total);
 
       return response.json({
           data_informacoes: data,
           resultados: results
       });

    },



    async Total(request, response){
        var data = await db.query('SELECT "Data" FROM "public"."indicesCriminais" LIMIT 1 ');
        data = data.rows.map((i)=>{return i.Data})[0];

        var i = await db.query('SELECT * FROM "public"."indicesCriminais" WHERE "Municipios" = \'Total RS\' LIMIT 1 ');
        i = i.rows[0];
        var total = { Abigeato: i.Abigeato,
            "Delitos Relacionados Com Armas e Munições": i.DelitosRelacionadosComArmasMunicoes,
            "Posse de Entorpecentes": i.EntorpecentesPosse,
            "Tráfico de Entorpecentes": i.EntorpecentesTrafico,
            "Estelionato": i.Estelionato,
            "Furto de Veiculo": i.FurtoDeVeiculo,
            "Furtos": i.Furtos,
            "Homicidio Doloso": i.HomicidioDoloso,
            "Latrocinio": i.Latrocinio,
            "Roubo de Veiculo": i.RouboDeVeiculo,
            "Roubos": i.Roubos,
            "Total de Vitimas de Homicidio Doloso": i.TotalDeVitimasDeHomicidioDoloso,
            "Total de Vitimas de Latrocinio": i.VitimasDeLatrocinio,
            "Vitimas de Lesão Corporal Seguida de Morte": i.VitimasDeLesaoCorpSegMorte,
        }
        return response.json({
            data_informacoes: data,
            total: total
        });
 

    },

 
}