//Inicialização
import sleep from 'k6';

// configuração
export const option = {
    vus: 1,                    //quantidade de usuários virtuais
    duration: '10s'
}

// Execução 
export default function(){
    console.log("testando o K6");
    sleep(1);
}

// Desmontagem
export function teardown(data){
    console.log(data)
}