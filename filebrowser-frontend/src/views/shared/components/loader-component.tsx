import React from 'react';
import Loader from 'react-loader-spinner';
import { IApplicationState } from '../../../state';
import { connect } from "react-redux";

interface Props {
    rootLoading: boolean;
    contentsLoading: boolean;
}

class LoaderComponent extends React.Component<Props> {
    render() {
        return (
            (this.props.rootLoading || this.props.contentsLoading) && <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "50%"
                }}>
                <Loader type="ThreeDots" color="#0BA5A5" height={100} width={100} />
            </div>
        );
    }
}

function mapStateToProps(state: IApplicationState) {
	return {
        rootLoading: state.folders.loading,
        contentsLoading: state.contents.loading,
	};
}

export default connect(
	mapStateToProps,
	{  }
)(LoaderComponent);