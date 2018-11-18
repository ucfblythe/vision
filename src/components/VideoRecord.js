import React from 'react';
import ReactWebCamCapture from './WebcamCapture';
class VideoRecord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vidStream:""
        };

        this.handleGranted = this.handleGranted.bind(this)
        this.handleStart = this.handleStart.bind(this)
    }

    handleGranted()
    {

    }

    handleDenied(error)
    {

    }

    handleStart(stream)
    {
        this.video.srcObject = stream;
    }

    handleStop()
    {

    }

    handlePause()
    {

    }

    handleResume(stream)
    {
    }

    handleError(error)
    {
        alert(error);
    }

    render() {
        return (
            <div>
                <h1>Video Recording Example</h1>
                <hr />

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
            </div>
        );
    }
}

export default VideoRecord;