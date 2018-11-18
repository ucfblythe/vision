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
            loaded:false
        };

        this.handleGranted = this.handleGranted.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.testDetection = this.testDetection.bind(this);

        this.missedCount = 0;
    }

    async componentDidMount() {
        await this.loadModels();
    }

    async loadModels () {
        await faceapi.loadMtcnnModel('http://pseudobrilliant.com/files/weights/');
        await faceapi.loadFaceDetectionModel('http://pseudobrilliant.com/files/weights/');
        await faceapi.loadFaceLandmarkModel('http://pseudobrilliant.com/files/weights/');
        await faceapi.loadFaceRecognitionModel('http://pseudobrilliant.com/files/weights/');
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
            minFaceSize: 100
        };

        const context = this.canvas.getContext('2d');

        const mtcnnResults = await faceapi.mtcnn(this.video, mtcnnForwardParams);

        if(mtcnnResults.length !== 0)
        {
            if(this.state.loaded === false)
            {
                this.setState({loaded:true})
            }

            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        faceapi.drawDetection(this.canvas, mtcnnResults.map(res => res.faceDetection),
            { withScore:false, boxColor:'LightGreen'});

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
                            <Button bsStyle={this.state.loaded ? 'success' : 'warning'} block>
                                {this.state.loaded ?  'Complete Registration' : 'loading...' }
                            </Button>
                        </div>
                    } />
            </FlexView>
        );
    }
}

export default WebcamRegistration;