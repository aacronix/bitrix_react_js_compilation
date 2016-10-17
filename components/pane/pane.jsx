import React from 'react';

var Pane = React.createClass({
    displayName: 'Pane',
    propTypes: {
        label: React.PropTypes.string.isRequired,
        children: React.PropTypes.element.isRequired
    },
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Pane;