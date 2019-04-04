import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as PedigreeActions from '../../../actions/pedigree';
import Icon from '@material-ui/core/Icon';
import FloatingActionButton from '@material-ui/core/Button';

class PedigreeCardView extends React.Component {

  constructor(props) {
    super(props);
    this.handleNewPedigreeRelClick = this.handleNewPedigreeRelClick.bind(this);
  }

  // get the related subject and the related
  // subject role in json format by filtering out current subject info.
  organizeRelationshipList() {
    const relationships = this.props.pedigree.items.items;
    const subject = this.props.subject;
    const organizedRelationships = [];

    // return null if there are no relationships in the eHB
    if (relationships){
      relationships.relationships.forEach(function (relationship) {
        if (relationship.subject_1_id == subject.id) {
          organizedRelationships.push({ "subject_org_id": relationship.subject_2_org_id,
                                      "subject_role": relationship.subject_2_role});
        }
        else {
          organizedRelationships.push({"subject_org_id": relationship.subject_1_org_id,
                                      "subject_role": relationship.subject_1_role});
        }
      });
    }
    // return null if there are no relationships in the eHB
    if (organizedRelationships.length == 0){
      return null;
    }
    else{
      return organizedRelationships
    }
  }
  renderRelationships(relationships){
    return(
      relationships ?
        relationships.map((item, i)=> (
          <tr key={i} >
            <td > {item.subject_role} </td>
            <td > {item.subject_org_id} </td>
          </tr>))
          :
          <tr>
            <td> No Relationships </td>
            <td>  </td>
          </tr>
    );
  }

  handleNewPedigreeRelClick(pedigree_relationship) {
    const { dispatch } = this.props;
    dispatch(PedigreeActions.setActivePedigreeRel(pedigree_relationship));
    dispatch(PedigreeActions.setAddPedigreeRelMode(true));
  }

  render() {
    const addButtonStyle = {
      marginLeft: '10px',
      marginTop: '10px',
      float: 'right',
    };
    const protocol = this.props.activeProtocolId;
    const relationships = this.props.pedigree.items.items;
    let organizedRelationships = null;
    if (relationships.length !=0){
      organizedRelationships = this.organizeRelationshipList();
      }
    else {
      organizedRelationships = null;
    }
    return (
      <div className="card">
        <div className="content">
          <h5 className="category"> Relationships
            <FloatingActionButton
              onClick={() => this.handleNewPedigreeRelClick(this.props.pedigree)  }
              backgroundColor={'#7AC29A'}
              mini
              style={addButtonStyle}
              disableTouchRipple={true}>
              <Icon className={classes.icon}>add_circle</Icon>
            </FloatingActionButton>
          </h5>
          <table className="table table-striped">
            <thead>
              <tr><th>Relation</th><th>MRN</th></tr>
            </thead>
            <tbody>
              {this.renderRelationships(organizedRelationships)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

PedigreeCardView.propTypes = {
  dispatch: React.PropTypes.func,
  protocol: React.PropTypes.object,
  subject: React.PropTypes.object,
  activeRecord: React.PropTypes.object,
  activeProtocolId: React.PropTypes.number,
  pedigree: React.PropTypes.object,
  isFetching: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    pedigree: {
      isFetching: state.pedigree.isFetching,
      items: state.pedigree,
    },
    subject: state.subject.activeSubject,
    activeRecord: state.record.activeRecord,
    activeProtocol: state.protocol.activeProtocol,
    activeProtocolId: state.protocol.activeProtocolId,
  };
}

export default connect(mapStateToProps)(PedigreeCardView);
