import React from 'react';
import * as PedigreeActions from '../../../actions/pedigree';
import * as SubjectActions from '../../../actions/subject';
import PedigreeCardView from './PedigreeCardView';
import { connect } from 'react-redux';

class PedigreePanel extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(PedigreeActions.fetchPedigree(
      this.props.activeProtocolId,
      this.props.activeSubject.id));
    dispatch(SubjectActions.fetchSubjects(this.props.activeProtocolId));
    dispatch(PedigreeActions.fetchRelationshipTypes());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(PedigreeActions.clearPedigreeState());
  }


    render() {
      return (<PedigreeCardView />);
    }
}
PedigreePanel.propTypes = {
  dispatch: React.PropTypes.func,
  protocol: React.PropTypes.object,
  activeSubject: React.PropTypes.object,
  activeRecord: React.PropTypes.object,
  activeProtocolId: React.PropTypes.number,
  pedigree: React.PropTypes.object,
  isFetching: React.PropTypes.bool,
  subjects: React.PropTypes.array,
  relTypes: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    pedigree: {
      isFetching: state.pedigree.isFetching,
      items: state.pedigree,
      relType: state.pedigree.relType,
    },
    activeSubject: state.subject.activeSubject,
    activeRecord: state.record.activeRecord,
    activeProtocol: state.protocol.activeProtocol,
    activeProtocolId: state.protocol.activeProtocolId,
    subjects: state.subject.items,
  };
}

export default connect(mapStateToProps)(PedigreePanel);
