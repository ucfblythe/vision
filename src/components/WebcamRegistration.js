import React from 'react';
import ReactWebCamCapture from './WebcamCapture';
import FlexView from 'react-flexview'
import * as faceapi from 'face-api.js'

class WebcamRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vidStream:""
        };

        this.handleGranted = this.handleGranted.bind(this)
        this.handleStart = this.handleStart.bind(this)
    }


    async componentDidMount() {
        await this.loadModels();
    }

    async loadModels () {
        //await faceapi.loadModels('/')
        faceapi.loadFaceDetectionModel('http://pseudobrilliant.com/files/weights/');
        faceapi.loadFaceLandmarkModel('http://pseudobrilliant.com/files/weights/');
        faceapi.loadFaceRecognitionModel('http://pseudobrilliant.com/files/weights/');
        this.faceDetection();
    }

    async faceDetection() {
        const mtcnnForwardParams = {
            // number of scaled versions of the input image passed through the CNN
            // of the first stage, lower numbers will result in lower inference time,
            // but will also be less accurate
            maxNumScales: 10,
            // scale factor used to calculate the scale steps of the image
            // pyramid used in stage 1
            scaleFactor: 0.709,
            // the score threshold values used to filter the bounding
            // boxes of stage 1, 2 and 3
            scoreThresholds: [0.6, 0.7, 0.7],
            // mininum face size to expect, the higher the faster processing will be,
            // but smaller faces won't be detected
            minFaceSize: 200
        };


        const mtcnnResults = await faceapi.mtcnn(this.video, mtcnnForwardParams);
        faceapi.drawDetection('overlay', mtcnnResults.map(res => res.faceDetection), { withScore: false });

    }


    handleGranted()
    {

    }

    handleDenied(error)
    {
        alert('Unable to load stream');
    }

    handleStart(stream)
    {
        this.video.srcObject = stream;
    }

    handleError(error)
    {
        alert(error);
    }

    render() {

        return (
                <div style={{position: 'relative'}} className="margin">
                <ReactWebCamCapture
                    constraints={{ audio: false, video: true }}
                    timeSlice={10}
                    onGranted={this.handleGranted}
                    onDenied={this.handleDenied}
                    onError={this.handleError}
                    onStart={this.handleStart}
                    render={() =>
                        <video autoPlay
                               ref={(ref) => {
                            this.video = ref;}}>

                        </video>
                    } />
                <canvas id="overlay"/>
                </div>
        );
    }
}

export default WebcamRegistration;