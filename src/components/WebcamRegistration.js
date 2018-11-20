import React from 'react';
import {Button, FormGroup} from 'react-bootstrap';
import ReactWebCamCapture from './WebcamCapture';
import FlexView from 'react-flexview'
import * as faceapi from 'face-api.js'

class WebcamRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vidStream:"",
            detection:0
        };

        this.handleGranted = this.handleGranted.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.testDetection = this.testDetection.bind(this);

        this.DetectionCondition = {"LOADING":0, "FAR":1, "CLOSE":2, "SUCCESS":3};

        this.DetectionStateColors = ['gray', 'red', 'yellow', 'lightGreen'];

        this.DetectionButtonState = ['default', 'danger', 'warning', 'success'];

        this.DetectionStateText = ['Loading...', 'Too Far', 'Too Far', 'Complete Registration'];
    }

    async componentDidMount() {
        await this.loadModels();
    }

    async loadModels () {
        await faceapi.loadMtcnnModel('https://visionrecog.com/weights');
        await faceapi.loadFaceDetectionModel('https://visionrecog.com/weights');
        await faceapi.loadFaceLandmarkModel('https://visionrecog.com/weights');
        await faceapi.loadFaceRecognitionModel('https://visionrecog.com/weights');
    }

    async faceDetection() {
        const mtcnnForwardParams = {
            // number of scaled versions of the input image passed through the CNN
            // of the first stage, lower numbers will result in lower inference time,
            // but will also be less accurate
            maxNumScales: 100,
            // scale factor used to calculate the scale steps of the image
            // pyramid used in stage 1
            scaleFactor: 0.709,
            // the score threshold values used to filter the bounding
            // boxes of stage 1, 2 and 3
            scoreThresholds: [0.6, 0.7, 0.7],
            // mininum face size to expect, the higher the faster processing will be,
            // but smaller faces won't be detected
            minFaceSize: 150
        };

        const context = this.canvas.getContext('2d');

        const mtcnnResults = await faceapi.detectSingleFace(this.video, new faceapi.MtcnnOptions(mtcnnForwardParams));
        if(mtcnnResults)
        {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const detectionsForSize = mtcnnResults.forSize(this.video.width, this.video.height);

            if(detectionsForSize.box.width < 125 || detectionsForSize.box.width < 125)
            {
                this.SetDetectionCondition(this.DetectionCondition['FAR']);
            }
            else
            if(detectionsForSize.box.width < 200 || detectionsForSize.box.width < 200)
            {
                this.SetDetectionCondition(this.DetectionCondition['CLOSE']);
            }
            else
            {
                this.SetDetectionCondition(this.DetectionCondition['SUCCESS']);
            }

            this.canvas.width = this.video.width;
            this.canvas.height = this.video.height;

            faceapi.drawDetection(this.canvas, detectionsForSize, { withScore: false, boxColor:this.DetectionStateColors[this.state.detection]});
        }
    }

    SetDetectionCondition(cond)
    {
        if(this.state.detection !== cond)
        {
            this.setState({detection: cond});
        }
    }

    testDetection()
    {
        this.faceDetection();
    }

    handleGranted()
    {

    }

    handleDenied(error)
    {
        alert('Error:Unable to load stream!');
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
            <FlexView hAlignContent='center'>
                <ReactWebCamCapture
                    constraints={{ audio: false, video: true }}
                    timeSlice={10}
                    onGranted={this.handleGranted}
                    onDenied={this.handleDenied}
                    onError={this.handleError}
                    onStart={this.handleStart}
                    handleUpdate={this.testDetection}
                    render={() =>
                        <div style={{position: 'relative'}} className="margin">
                            <video autoPlay muted id='inputVideo' width={640} height={480}
                                   ref={(ref) => {this.video = ref;}}>
                            </video>
                            <canvas id="overlay" width={640} height={480} style={{ position: 'absolute', top: '0', left: '0', size:'auto' }}
                                    ref={(ref) => { this.canvas = ref;}}/>
                            <Button bsStyle={this.DetectionButtonState[this.state.detection]} block>
                                {this.DetectionStateText[this.state.detection]}
                            </Button>
                        </div>
                    } />
            </FlexView>
        );
    }
}

export default WebcamRegistration;