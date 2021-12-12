# MockMonitor.readResource crash

This repo is a small reproduction of an error in pulumis MockMonitor.

It is possible to run the test with either `mocha` or `jest` with npm scripts, see below.

## mocha

```
$ npm run mocha

> missing-get-custom@ mocha ~/missing-get-custom
> mocha -r ts-node/register test.ts



  aws.ec2.Vpc
    1) get


  0 passing (2s)
  1 failing

  1) aws.ec2.Vpc
       get:
     Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/Users/henro/Development/missing-get-custom/test.ts)
      at listOnTimeout (internal/timers.js:557:17)
      at processTimers (internal/timers.js:500:7)
```

## jest

```
$ npm run jest

> missing-get-custom@ jest ~/missing-get-custom
> jest

 FAIL  ./test.ts (7.753 s)
  aws.ec2.Vpc
    ✕ get (5002 ms)

  ● aws.ec2.Vpc › get

    failed to read resource #vpc-id 'vpc-name' [aws:ec2/vpc:Vpc]: req.getCustom is not a function

      22 |             } else {
      23 |                 done();
    > 24 |             }
         |              ^
      25 |         })
      26 |     })
      27 | });

      at Object.readResource (node_modules/@pulumi/runtime/resource.ts:206:27)
      at new Resource (node_modules/@pulumi/resource.ts:354:13)
      at new CustomResource (node_modules/@pulumi/resource.ts:731:9)
      at new Vpc (node_modules/@pulumi/ec2/vpc.ts:255:9)
      at Function.get (node_modules/@pulumi/ec2/vpc.ts:84:16)
      at Object.<anonymous> (test.ts:24:27)

  ● aws.ec2.Vpc › get

    thrown: "Exceeded timeout of 5000 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      21 |                 done(`invalid vpc id! ${id}`);
      22 |             } else {
    > 23 |                 done();
         |   ^
      24 |             }
      25 |         })
      26 |     })

      at test.ts:23:3
      at Object.<anonymous> (test.ts:22:1)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        7.859 s
Ran all test suites.
```
