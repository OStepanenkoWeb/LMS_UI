import React, {FC} from 'react';

interface ICoursePlayer {
    videoUrl: string,
    title: string
}

const CoursePlayer:FC<ICoursePlayer> = ({ videoUrl, title}) => {
    // https://www.youtube.com/embed/Big_aFLmekI
    return (
        <div style={{paddingTop: '41%', position: 'relative'}}>
            <iframe
                width="420"
                height="315"
                style={{
                    border: 0,
                    width: '90%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
                src={videoUrl}>
            </iframe>
        </div>
    );
};

export default CoursePlayer;