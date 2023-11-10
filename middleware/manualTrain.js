const ManualTrain=(weights)=>{
    const normWeight = weights.normWeight
    var rawModel={
        type:"NeuralNetwork",
        sizes:[normWeight.length,3,1],
        layers:[
            {weights:[],biases:[]},
            {weights:[
                normWeight.map(Number),
                normWeight.map(Number),
                normWeight.map(Number)
            ],
            biases:[1,1,1]
            },
            {weights:[
                [.3,.3,.3]
            ],
            biases:[1]}],
            inputLookup:null,
            inputLookupLength:0,
            outputLookup:null,
            outputLookupLength:0,
            options:{
                inputSize:0,
                outputSize:0,
                binaryThresh:0.5,
                hiddenLayers:[3],
                activation:"sigmoid"
            },
            trainOpts:{
                activation:"sigmoid",
                iterations:100,
                errorThresh:0.005,
                log:true,
                logPeriod:10,
                leakyReluAlpha:0.01,
                learningRate:0.3,
                momentum:0.1,
                callbackPeriod:10,
                timeout:"Infinity",
                beta1:0.9,
                beta2:0.999,
                epsilon:1e-8
            }
        }
    return({weight:weights, model:rawModel})
}
module.exports = ManualTrain
