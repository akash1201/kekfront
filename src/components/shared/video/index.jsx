import React from "react";
import PropTypes from "prop-types";
import { Portal } from "react-portal";
const Video = ({ channel, isOpen, videoId, setOpen }) => {
    return (
        <Portal>
        </Portal>
    );
};

Video.propTypes = {
    isOpen: PropTypes.bool,
    videoId: PropTypes.string,
    setOpen: PropTypes.func,
    channel: PropTypes.string,
};

export default Video;
