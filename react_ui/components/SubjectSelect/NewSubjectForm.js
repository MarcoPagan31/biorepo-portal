// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React from 'react';
import PropTypes from 'prop-types';
import * as SubjectActions from '../../actions/subject';
import RaisedButton from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import * as Colors from '@material-ui/core/colors';
import SubjectOrgSelectField from '../SubjectView/SubjectPanel/SubjectOrgSelectField';
import SubjectTextField from '../SubjectView/SubjectPanel/SubjectTextField';
import SubjectDOBField from '../SubjectView/SubjectPanel/SubjectDOBField';
import LoadingGif from '../LoadingGif';
import { connect } from 'react-redux';
import moment from 'moment';
import Button from 'react-bootstrap/Button'
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';


// Use named export for unconnected component (for testing)
export class NewSubjectForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleSaveClick(e) {
    e.preventDefault();
    const protocolId = this.props.protocol.activeProtocolId;
    const subject = this.props.subject.newSubject;
    const { dispatch } = this.props;
    if (this.isValid()) {
      dispatch(SubjectActions.addSubject(protocolId, subject));
    }
  }

  handleCloseClick() {
    const { dispatch } = this.props;
    dispatch(SubjectActions.setAddSubjectMode());
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(SubjectActions.fetchSubjects(this.props.protocol.activeProtocolId));
    document.removeEventListener('click', this.handleClick);
  }

  validateDate(date) {
    const { dispatch } = this.props;
    if (!moment(date, ['YYYY-MM-DD']).isValid()) {
      dispatch(SubjectActions.setUpdateFormErrors('Must be a valid date (YYYY-MM-DD).'));
      return false;
    }
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(date)) {
      dispatch(SubjectActions.setUpdateFormErrors('Must be a valid date (YYYY-MM-DD).'));
      return false;
    }
    if (date === '') {
      return false;
    }
    return true;
  }

  isValid() {
    const subject = this.props.subject.newSubject;
    const { dispatch } = this.props;

    let valid = true;
    const errors = [];

    if (subject == null) {
      valid = false;
    }

    if (Object.keys(subject).length === 0) {
      valid = false;
    }

    if (!subject.organization) {
      errors.push('Organization field is required');
      valid = false;
    }

    if (!subject.first_name) {
      errors.push('First name field is required');
      valid = false;
    }

    if (!subject.last_name) {
      errors.push('Last name field is required');
      valid = false;
    }

    if (!this.validateDate(subject.dob)) {
      errors.push('Date of birth field is required');
      valid = false;
    }

    if (!subject.organization_subject_id) {
      errors.push('Organization subject ID is required');
      valid = false;
    }

    if (subject.organization_subject_id !== subject.organization_subject_id_validation) {
      errors.push('Organization subject IDs do not match');
      valid = false;
    }

    dispatch(SubjectActions.setNewSubjectFormErrors(errors));
    return valid;
  }

  renderErrors() {
    let errors =  '';
    const serverErrors = this.props.newFormErrors.server;
    const formErrors = this.props.newFormErrors.form;
    if (serverErrors) {
      errors = serverErrors.concat(formErrors);
    } else {
      errors = formErrors;
    }
    const style = {
      fontSize: '12px',
      marginTop: '15px',
    };
    if (errors) {
      return errors.map((error, i) => (
        <div key={i} style={style} className="alert alert-danger">
          <div className="container">
            {error}
          </div>
        </div>
        )
      );
    }
    return null;
  }

  render() {
    const newSub = this.props.subject.newSubject;
    const newSubFormStyle = {
      left: '50%',
      marginLeft: '-15em',
      marginBottom: '3em',
      position: 'fixed',
      zIndex: '1000',
    };
    const cardStyle = {
      padding: '15px',
      boxShadow: '3px 3px 14px rgba(204, 197, 185, 0.5)',
      backgroundColor: 'white',
    };
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

    // jscs:disable
    return (
      <section>
        <div style={backdropStyle}></div>
            <PureModal
              isOpen
              width='500px'
              onClose={() => {return false;}}
              >
              <div className="card" style={cardStyle}>
                <h6 className="category"><center>Add New Subject</center></h6>
                <div className="more">
                </div>
                <div className="content">
                  <form id="subject-form" onSubmit={this.handleSaveClick}>
                    <SubjectOrgSelectField
                      new
                      error={this.props.newFormErrors.form.org}
                      value={newSub.organization}
                    />
                    <SubjectTextField
                      new
                      error={this.props.newFormErrors.form.first_name}
                      label={'First Name'}
                      value={''}
                      skey={'first_name'}
                    />
                    <SubjectTextField
                      new
                      error={this.props.newFormErrors.form.last_name}
                      label={'Last Name'}
                      value={''}
                      skey={'last_name'}
                    />
                    <SubjectTextField
                      new
                      error={this.props.newFormErrors.form.org_id}
                      label={`${this.props.subject.newSubject.organization_id_label}`}
                      value={''}
                      skey={'organization_subject_id'}
                    />
                    <SubjectTextField
                      new
                      error={this.props.newFormErrors.form.org_valid}
                      label={`Verify ${this.props.subject.newSubject.organization_id_label}`}
                      value={''}
                      skey={'organization_subject_id_validation'}
                    />
                    <SubjectTextField
                      new
                      error={this.props.newFormErrors.form.dob}
                      label={'Date of Birth (YYYY-MM-DD)'}
                      value={''}
                      skey={'dob'}
                    />
                    <SubjectDOBField
                      value={''}
                    />
                    {this.props.savingSubject ? <LoadingGif style={{ width: '100%' }} /> :
                      <div>
                        <Button
                          label={'Add Subject'}
                          labelcolor={'#7AC29A'}
                          type="submit"
                          style={{ width: '100%' }}
                          onClick={this.handleSaveClick}
                        > Add Subject </Button>
                        <Divider />
                        <Button
                          label={'Cancel'}
                          labelcolor={Colors.red400}
                          onClick={this.handleCloseClick}
                          style={{ width: '100%' }}
                        > Cancel </Button>
                      </div>
                    }
                  </form>
                {this.renderErrors()}
                </div>
              </div>
            </PureModal>
      </section>
    );
  }
  // jscs:enable
}

NewSubjectForm.propTypes = {
  dispatch: PropTypes.func,
  protocol: PropTypes.object,
  subject: PropTypes.object,
  pds: PropTypes.object,
  savingSubject: PropTypes.bool,
  newFormErrors: PropTypes.object,
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
      newSubject: state.subject.newSubject,
    },
    pds: {
      items: state.pds.items,
    },
    savingSubject: state.subject.isSaving,
    newFormErrors: state.subject.newFormErrors,
  };
}

export default connect(mapStateToProps)(NewSubjectForm);
