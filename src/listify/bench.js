import Benchmark from 'benchmark';
import { immutableArrayProxy } from './impls/array-proxy.js';

export const benchmark = (...impls) => {
    const nums = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];

    nums.reverse();

    for (const num of nums) {
        const bench = new Benchmark.Suite();

        const ls = Array(num).fill(0).map((_, i) => i);
        const args = ls.join(',');

        const proxyFunc = Function("proxy", `return () => new Proxy([${args}], proxy);`);
        bench.add(`new Proxy([...], proxy) with ${num} entries`, proxyFunc(immutableArrayProxy));

        {
            const nfunc = Function("fn", `return () => fn(${args});`);
            for (const impl of impls) {
                let msg;
                if (num === 1) {
                    msg = `${impl.name} with ${num} arg`;
                } else {
                    msg = `${impl.name} with ${num} args`;
                }
                bench.add(msg, nfunc(impl));
            }
        }
        let done = new Set();
        bench.on('cycle', function () {
            for (let i = 0; i < this.length; i++) {
                const res = this[i];
                if (res.hz == 0 || done.has(i)) {
                    continue;
                }
                done.add(i);
                let unit;
                let v;
                if (res.hz > 1000 * 1000 * 1000) {
                    unit = 'gigahertz';
                    v = res.hz / (1000 * 1000 * 1000);
                } else if (res.hz > 1000 * 1000) {
                    unit = 'megahertz';
                    v = res.hz / (1000 * 1000);
                } else if (res.hz > 1000) {
                    unit = 'kilohertz';
                    v = res.hz / 1000;
                } else {
                    unit = 'hertz';
                    v = res.hz;
                }
                v = Math.floor(v * 1000) / 1000;
                const msg = `${res.name} runs at ${v} ${unit}`
                console.log(msg);
            }
        });

        bench.run();
    }
};
