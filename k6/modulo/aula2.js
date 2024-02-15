import http from 'k6/http';
import { check }  from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],      //taxa de falha seja inferior a 1%
        http_req_duration: [{threshold: 'p(95) < 200', abortOnFail: true}],    // duração da requisição tenha um limite de percentil 95% a 200milissegundos e se caso não atingir esse porcentil e vai ser abortado o teste
        
        checks: ['rate > 0.99']
    }
}

export default function () {
    const res = http.get('http://test.k6.io/')

    check(res, {
        'status code é 200': (r) => r.status === 201
    });
}