import React from 'react';
import {Button} from 'react-bootstrap';
import FaceAPIComponent from './FaceAPIComponent'
import FlexView from 'react-flexview'

class WebcamRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detection:0,
            condition:0
        };

        this.submitRegistration = this.submitRegistration.bind(this);

        this.DetectionCondition = {"LOADING":0, "FAR":1, "CLOSE":2, "SUCCESS":3};

        this.DetectionStateColors = ['gray', 'red', 'yellow', 'lightGreen'];

        this.DetectionButtonState = ['default', 'danger', 'warning', 'success'];

        this.DetectionStateText = ['Loading...', 'Too Far', 'Too Far', 'Complete Registration'];

        this.detectionChange = this.detectionChange.bind(this);
        this.getDetection = this.getDetection.bind(this);
    }

    detectionChange(cnd)
    {
        this.setState({condition: cnd});
    }

    getDetection()
    {
        this.faceAPICmp.getDetection();
    }

    submitRegistration(detection)
    {
        this.props.onSubmit(detection);
    }

    render() {

        return (
            <FlexView hAlignContent='center'>
                <div style={{width: "640px"}}>
                    <FaceAPIComponent mode="detection" block
                                      farScore={0.80} farDist={125}
                                      closeScore={0.90} closeDist={150}
                                      onDetectionChange={this.detectionChange}
                                      onDetectionGet={this.submitRegistration}
                                      ref={(ref) => {this.faceAPICmp = ref;}}
                    />
                    <Button bsStyle={this.DetectionButtonState[this.state.condition]} block
                            onClick={this.getDetection}>
                        {this.DetectionStateText[this.state.condition]}
                    </Button>
                </div>
            </FlexView>
        );
    }
}

export default WebcamRegistration;