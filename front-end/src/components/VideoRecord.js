import React from 'react';
import ReactWebCamCapture from 'react-webcam-capture';
class VideoRecord extends React.Component {

    handleGranted()
    {

    }

    handleDenied(error)
    {
        alert(error);
    }

    handleStart(stream)
    {

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
                    onStart={this.handleStart}
                    onStop={this.handleStop}
                    onPause={this.handlePause}
                    onResume={this.handleResume}
                    onError={this.handleError}
                    render={({ start, stop, pause, resume }) =>
                        <div>
                            <button onClick={start}>Start</button>
                            <button onClick={stop}>Stop</button>
                            <button onClick={pause}>Pause</button>
                            <button onClick={resume}>Resume</button>

                            <p>Streaming test</p>
                            <video autoPlay></video>
                        </div>
                    } />
            </div>
        );
    }
}

export default VideoRecord;