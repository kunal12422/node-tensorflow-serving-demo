const grpc    = require('grpc');
const express = require('express');

// TensorFlow Serving configuration settings
const config  = require('./config');

// Load Protocol Buffers
const proto = grpc.load('./protos/mnist_inference.proto').tensorflow.serving;
const MnistService = proto.MnistService;

// Create TensorFlow Serving MNIST client
const client = new MnistService(config.TENSORFLOW_SERVING_HOST, grpc.credentials.createInsecure());

// Sample data
const SAMPLE_DATA = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02352941408753395, 0.5098039507865906, 0.9411765336990356, 0.9960784912109375, 0.9019608497619629, 0.6666666865348816, 0.13333334028720856, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.03921568766236305, 0.4745098352432251, 0.9960784912109375, 0.8352941870689392, 0.5568627715110779, 0.7529412508010864, 0.960784375667572, 0.9647059440612793, 0.2196078598499298, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4705882668495178, 1.0, 0.6784313917160034, 0.03529411926865578, 0.0, 0.0, 0.2666666805744171, 0.9490196704864502, 0.960784375667572, 0.16078431904315948, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.062745101749897, 0.9137255549430847, 0.8666667342185974, 0.0313725508749485, 0.0, 0.0, 0.0, 0.0, 0.2705882489681244, 0.9490196704864502, 0.847058892250061, 0.46666669845581055, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.250980406999588, 0.9960784912109375, 0.43137258291244507, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.615686297416687, 0.9960784912109375, 0.9960784912109375, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.46666669845581055, 0.9803922176361084, 0.09803922474384308, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.501960813999176, 0.9960784912109375, 0.7843137979507446, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7960785031318665, 0.6823529601097107, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.501960813999176, 0.9960784912109375, 0.6823529601097107, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7176470756530762, 0.7411764860153198, 0.05882353335618973, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.501960813999176, 0.9960784912109375, 0.43137258291244507, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.22745099663734436, 0.9803922176361084, 0.7960785031318665, 0.3176470696926117, 0.0, 0.0, 0.0, 0.0, 0.0, 0.501960813999176, 0.9960784912109375, 0.37254902720451355, 0.03529411926865578, 0.4941176772117615, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.45098042488098145, 0.9960784912109375, 0.9294118285179138, 0.3137255012989044, 0.0, 0.0, 0.0, 0.0, 0.501960813999176, 0.9960784912109375, 0.5647059082984924, 0.8431373238563538, 0.5764706134796143, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.43137258291244507, 0.8862745761871338, 0.9960784912109375, 0.5490196347236633, 0.08235294371843338, 0.05882353335618973, 0.007843137718737125, 0.8235294818878174, 0.9960784912109375, 0.9960784912109375, 0.8196079134941101, 0.0784313753247261, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1098039299249649, 0.46274513006210327, 0.9411765336990356, 0.9960784912109375, 0.9843137860298157, 0.7803922295570374, 0.9960784912109375, 0.9960784912109375, 0.7803922295570374, 0.0784313753247261, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.10588236153125763, 0.4784314036369324, 0.501960813999176, 0.49803924560546875, 0.9019608497619629, 0.9960784912109375, 0.062745101749897, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8117647767066956, 0.9333333969116211, 0.0470588281750679, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8117647767066956, 0.7450980544090271, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.24313727021217346, 0.9960784912109375, 0.41960787773132324, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6705882549285889, 0.9960784912109375, 0.125490203499794, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0313725508749485, 0.8705883026123047, 0.9019608497619629, 0.062745101749897, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2392157018184662, 0.9960784912109375, 0.458823561668396, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.27843138575553894, 0.9568628072738647, 0.12941177189350128, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

client.classify({image_data: SAMPLE_DATA}, (err, mnistResponse) => {
  console.log(err);
  if (!err && mnistResponse) {
    const results = mnistResponse.value;
    results.forEach((result, digit) => {
      console.log(`This image has a ${Math.ceil(result * 10000) / 100}% chance of being the digit ${digit}.`);
    });
  }
});
