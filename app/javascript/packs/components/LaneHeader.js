import React, { Fragment, Component } from "react";

class LaneHeader extends Component {
  render() {
    return (
      <Fragment>
        <b>{this.props.id}</b> ({this.props.cards.length}/
        {this.props.total_count})
      </Fragment>
    );
  }
}

export default LaneHeader;
