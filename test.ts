import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        return args.inputs;
    },
});

describe("aws.ec2.Vpc", function() {
    it("get", function(done) {
        let vpc = aws.ec2.Vpc.get("vpc-name","vpc-id");
        vpc.id.apply(id => {
            if (id !== "vpc-id") {
                done(`invalid vpc id! ${id}`);
            } else {
                done();
            }
        })
    })
});
