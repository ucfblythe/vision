import React, { Component } from 'react'

if(location.protocol !== 'https:' && location.hostname !== 'localhost') {
    console.warn('getUserMedia() must be run from a secure origin: https or localhost.\nChanging protocol to https.')
}

if(!navigator.mediaDevices && !navigator.getUserMedia) {
    console.warn(`Your browser doesn't support navigator.mediaDevices.getUserMedia and navigator.getUserMedia.`)
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

// stop hack
// from http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
var MediaStream = window.MediaStream || window.webkitMediaStream
if(typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
    MediaStream.prototype.stop = () => {
        this.getAudioTracks().forEach((track) => {
            track.stop()
        });

        this.getVideoTracks().forEach((track) => {
            track.stop()
        });
    }
}

class ReactWebCamCapture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asked: false,
            permission: false,
            available: false,
            recording: false,
            paused: false
        };

        this.stream = null;
        this.mediaRecorder = null;
        this.mediaChunk = [];

        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleFailed = this.handleFailed.bind(this);
    }


    componentDidMount() {
        this.getUserMedia()
    }

    componentWillUnmount() {
        this.mediaRecorder = null;
        this.mediaChunk = [];

        this.stream.stop();
        this.stream = null;
    }

    handleSuccess(stream){
        if(this.props.autoPlay) {
            this.props.setStreamToVideo(stream);
        }
        this.stream = stream;
        this.mediaChunk = [];

        this.setState({
            permission: true,
            asked: true,
            recording: false
        });

        this.props.onGranted();

        this.initMediaRecorder();
    };

    handleFailed(err)
    {
        this.setState({ asked: false });
        this.props.onDenied(err);
    }

    getUserMedia()
    {
        const { constraints } = this.props;

        if(navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(this.handleSuccess)
                .catch(this.handleFailed)
        } else if(navigator.getUserMedia) {
            navigator.getUserMedia(constraints, this.handleSuccess, this.handleFailed);
        } else {
            let errMessage = `Browser doesn't support UserMedia API. Please try with another browser.`;
            console.warn(errMessage);

            this.props.onError(new Error(errMessage));
        }
    }

    initMediaRecorder()
    {
        try {
            let options = {};
            let types = ['video/webm; codecs=vp8', ''];

            if(this.props.mimeType) types.unshift(this.props.mimeType);

            for(let i = 0; i < types.length; i++)
            {
                let type = types[i];

                if(MediaRecorder.isTypeSupported(type))
                {
                    options.mimeType = type;
                    break;
                }

                console.warn(`${type} is not supported on your browser.`);
            }

            let mediaRecorder = new MediaRecorder(this.stream, options);

            mediaRecorder.ondataavailable = (ev) =>
            {
                if(ev.data && ev.data.size > 0) {
                    this.mediaChunk.push(ev.data);

                    if(this.props.handleUpdate !== 'undefined')
                    {
                        this.props.handleUpdate();
                    }
                }
            };

            this.mediaRecorder = mediaRecorder;

            this.setState({
                available: true
            });

            this.mediaChunk = [];
            this.mediaRecorder.start(this.props.timeSlice);

            this.setState({
                recording: true
            });

            this.props.onStart(this.stream);

        } catch(err) {
            console.log(err)
            console.error('Failed to initialize MediaRecorder.', err)

            this.setState({
                available: false
            })
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.render({})}
            </div>
        )
    }
}

ReactWebCamCapture.defaultProps = {
    constraints: {
        audio: true,
        video: true,
        width: { ideal: 4096 },
        height: { ideal: 2160 }
    },
    autoPlay: true,
    className: '',
    timeSlice: 0,
    mimeType: '',
    setStreamToVideo: function() {},
    render: function() {},
    onGranted: function() {},
    onDenied: function() {},
    onError: function() {}
};

export default ReactWebCamCapture
