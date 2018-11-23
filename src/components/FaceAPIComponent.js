import React from 'react';
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {isMobile} from 'react-device-detect';
import ReactWebCamCapture from './WebcamCapture';
import * as faceapi from 'face-api.js'

class WebcamRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vidStream:"",
            detection:0,
            loaded:false,
            model:""
        };

        this.handleGranted = this.handleGranted.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.testDetection = this.testDetection.bind(this);

        if(this.props.descriptor)
        {
            this.descriptor = new Float32Array(this.props.descriptor.split(",").map(Number));
        }

        this.DetectionCondition = {"LOADING":0, "FAR":1, "CLOSE":2, "SUCCESS":3};
        this.DetectionStateColors = ['gray', 'red', 'yellow', 'lightGreen'];
        this.handleModelChange = this.handleModelChange.bind(this)

    }

    async componentDidMount() {
        await this.loadModels();
    }

    async loadModels () {

        await faceapi.loadFaceDetectionModel('https://visionrecog.com/weights');
        await faceapi.loadFaceLandmarkModel('https://visionrecog.com/weights');
        await faceapi.loadFaceRecognitionModel('https://visionrecog.com/weights');

        if(isMobile)
        {
            await this.loadModel(1);
        }
        else
        {
            await this.loadModel(0);
        }
    }

    async faceDetection() {

        const context = this.canvas.getContext('2d');

        let results = await faceapi.detectSingleFace(this.video, this.forwardParams);

        if(results)
        {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const detectionsForSize = results.forSize(this.video.width, this.video.height);

            if(detectionsForSize.box.width < this.props.farDist || detectionsForSize.box.width < this.props.farDist
                || results.score < this.props.farScore)
            {
                this.SetDetectionCondition(this.DetectionCondition['FAR']);
            }
            else
            if(detectionsForSize.box.width < this.props.closeDist || detectionsForSize.box.width < this.props.closeDist
                || results.score < this.props.closeScore)
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
        else
        {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.SetDetectionCondition(this.DetectionCondition['FAR']);
        }
    }

    async faceVerification() {

        const context = this.canvas.getContext('2d');

        let results = await faceapi.detectSingleFace(this.video, this.forwardParams)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if(results)
        {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const detectionsForSize = results.detection.forSize(this.video.width, this.video.height);

            const dist =  faceapi.euclideanDistance(this.descriptor, results.descriptor);

            if(dist > this.props.farScore)
            {
                this.SetDetectionCondition(this.DetectionCondition['FAR']);
            }
            else
            if(dist > this.props.closeScore)
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
        else
        {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.SetDetectionCondition(this.DetectionCondition['FAR']);
        }
    }

    SetDetectionCondition(cond)
    {
        if(this.state.detection !== cond)
        {
            this.setState({detection: cond});

            if(this.props.onDetectionChange)
            {
                this.props.onDetectionChange(cond);
            }
        }
    }

    testDetection()
    {
        if(this.state.loaded)
        {
            if(this.props.mode === "detection")
            {
                this.faceDetection();
            }
            else
            if(this.props.mode === "verification")
            {
                this.faceVerification()
            }
        }
    }

    handleModelChange(modelVal)
    {
        if (this.state.model !== modelVal)
        {
            this.setState({loaded: false});

            this.loadModel(modelVal);
        }
    }

    async loadModel(modelVal)
    {
        this.SetDetectionCondition(this.DetectionCondition['LOADING']);

        switch (modelVal)
        {
            case 0:
                await faceapi.loadSsdMobilenetv1Model('https://visionrecog.com/weights');
                this.forwardParams = new faceapi.SsdMobilenetv1Options({minConfidence: 0.5, maxResults: 1});
                break;
            case 1:
                await faceapi.loadTinyFaceDetectorModel('https://visionrecog.com/weights');
                this.forwardParams = new faceapi.TinyFaceDetectorOptions({inputSize: 256, scoreThreshold: 0.5});
                break;
            case 2:
                await faceapi.loadMtcnnModel('https://visionrecog.com/weights');
                this.forwardParams = new faceapi.MtcnnOptions({minConfidence: 0.5, maxResults: 1});
                break;
        }

        this.setState({loaded: true, model:modelVal});
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

    async getDetection()
    {
        if(this.state.detection === this.DetectionCondition["SUCCESS"])
        {
            const results = await faceapi.detectSingleFace(this.video, this.forwardParams)
                .withFaceLandmarks()
                .withFaceDescriptor();

            this.props.onDetectionGet(results.descriptor);
        }
    }

    render() {

        let toggle;

        if(!isMobile)
        {
            toggle = <ToggleButtonGroup justified
                                        type="radio" name="options" defaultValue={0}
                                        value={this.state.model}
                                        onChange={this.handleModelChange}>
                        <ToggleButton value={0}>SSDMobilenetv1Model</ToggleButton>
                        <ToggleButton value={1}>TinyFaceDetector</ToggleButton>
                        <ToggleButton value={2}>MTCNN</ToggleButton>
                    </ToggleButtonGroup>
        }

        return (
            <ReactWebCamCapture
                constraints={{ audio: false, video: true }}
                timeSlice={10}
                onGranted={this.handleGranted}
                onDenied={this.handleDenied}
                onError={this.handleError}
                onStart={this.handleStart}
                handleUpdate={this.testDetection}
                render={() =>
                    <div style={{position: 'relative',float: "none", margin: "0 auto"}} className="margin">
                        <video autoPlay muted id='inputVideo' width={640} height={480}
                               ref={(ref) => {this.video = ref;}}>
                        </video>
                        <canvas id="overlay" width={640} height={480} style={{ position: 'absolute', top: '0', left: '0', size:'auto' }}
                                ref={(ref) => { this.canvas = ref;}}/>
                        {toggle}

                    </div>
                }
            />
        );
    }
}

export default WebcamRegistration;