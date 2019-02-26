import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import * as PedigreeActions from '../../../actions/pedigree';
import * as SubjectActions from '../../../actions/subject';
import * as Colors from 'material-ui/lib/styles/colors';
import LoadingGif from '../../LoadingGif';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

class PedigreeEditView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      relatedSubject: '',
      subjectRole: '',
      relatedSubjectRole: '',
    };
    this.handleRelatedSubjectSelect = this.handleRelatedSubjectSelect.bind(this);
    this.handleSubject1RoleSelect = this.handleSubject1RoleSelect.bind(this);
    this.handleSubject2RoleSelect = this.handleSubject2RoleSelect.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  menuItemsSubjects(){
    let subjectList = null;
    const subjects = this.props.subject.items;
    console.log(subjects !=null)
    if(subjects !=null){
      console.log("we are in if statement")
      subjectList =
        subjects.map((subject, i) => (
          <MenuItem key={i} value={subject.id} primaryText={subject.organization_subject_id} />
        ));
    }
    else{
      subjectList = <MenuItem primaryText={this.props.subject.activeSubject.organization_subject_id}>
      </MenuItem>;

    }
    return subjectList;
  }

  menuItemsRelTypes(){
    console.log("prop relTypes:")
    console.log(this.props.relTypes);
    let relTypeList = null;
    const relTypes = this.props.relTypes;
    relTypeList =
      relTypes.map((rel, i) => (
        <MenuItem key={i} value={rel.id} primaryText={rel.desc} />
      ))

      return relTypeList;
  }

  restorePedigree() {
    // Restores the current Pedigree view with server's pedigree state
    const { dispatch } = this.props;

  }

  handleRelatedSubjectSelect(e, index, value) {
    this.setState({relatedSubject: value});
  }

  handleSubject1RoleSelect(e, index, value){
    this.setState({subjectRole: value});
  }

  handleSubject2RoleSelect(e, index, value){
    this.setState({relatedSubjectRole: value});
  }

  handleNewpedRelClick(e) {
    const { dispatch } = this.props;
    //todo Program this
  }

  handleCloseClick() {
    // TODO: create this function - this.restorePedigree();
    const { dispatch } = this.props;
    dispatch(PedigreeActions.setAddPedigreeRelMode(false));
    // this.context.history.goBack();
  }

  renderErrors() {
    //
  }


  render() {
    console.log(this.state.subjectRole);
    const backdropStyle = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      zIndex: 99,
      display: 'block',
      backgroundColor: 'rgba(0, 0, 0, 0.298039)',
    };
    const cardStyle = {
      padding: '15px',
      boxShadow: '3px 3px 14px rgba(204, 197, 185, 0.5)',
      backgroundColor: 'white',
    };
    const modalStyle = {
      left: '45%',
      top: '20%',
      marginLeft: '-5em',
      marginBottom: '3em',
      position: 'fixed',
      zIndex: '1000',
    };
    const { value } = this.state;
      return (
        <section>
          <div style={backdropStyle}></div>
            <div className="col-sm-5 edit-label-modal" style={modalStyle}>
              <div className="card" style={cardStyle}>
                <h3 className="category" style={{ textAlign: 'center' }}> Add a new Relationship </h3>
                  <row>
                  <div className="col-md-6">
                    <TextField
                      style={{ width: '100%', whiteSpace: 'nowrap' }}
                      value={this.props.subject.activeSubject.organization_subject_id}
                      floatingLabelText={'Subject'}
                    />
                    </div>
                    <div className="col-md-6">
                      <SelectField
                        floatingLabelText={'Related Subject'}
                        onChange={this.handleRelatedSubjectSelect}
                        style={{ width: '100%' }}
                        value={this.state.relatedSubject}
                      >
                      {this.menuItemsSubjects()}
                      </SelectField>
                    </div>
                  </row>
                  <row>
                  <div className="col-md-6">
                    <SelectField
                      floatingLabelText={'Subject Role'}
                      style={{ width: '100%' }}
                      value={this.state.subjectRole}
                      onChange={this.handleSubject1RoleSelect}
                    >
                      {this.menuItemsRelTypes()}
                    </SelectField>
                  </div>
                  <div className="col-md-6">
                    <SelectField
                      floatingLabelText={'Related Subject Role'}
                      style={{ width: '100%' }}
                      value={this.state.relatedSubjectRole}
                      onChange={this.handleSubject2RoleSelect}
                    >
                    {this.menuItemsRelTypes()}
                    </SelectField>
                  </div>
                  </row>
                <RaisedButton
                  onClick={this.handleNewpedRelClick}
                  label={'Create New'}
                  labelColor={'#7AC29A'}
                  type="submit"
                  style={{ width: '100%' }}
                />
                <RaisedButton
                  style={{ width: '100%' }}
                  labelColor={Colors.red400}
                  label="Cancel"
                  onClick={this.handleCloseClick}
                />
              </div>
            </div>
        </section>
      );
  }
}

PedigreeEditView.propTypes = {
  dispatch: React.PropTypes.func,
  protocol: React.PropTypes.object,
  subject: React.PropTypes.object,
  pds: React.PropTypes.object,
  savingSubject: React.PropTypes.bool,
  relTypes: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    protocol: {
      items: state.protocol.items,
      activeProtocolId: state.protocol.activeProtocolId,
      orgs: state.protocol.orgs,
    },
    subject: {
      items: state.subject.items,
      activeSubject: state.subject.activeSubject,
      updateFormErrors: state.subject.updateFormErrors,
    },
    pds: {
      items: state.pds.items,
    },
    savingSubject: state.subject.isSaving,
    relTypes: state.pedigree.relTypes
  };
}

export default connect(mapStateToProps)(PedigreeEditView);
