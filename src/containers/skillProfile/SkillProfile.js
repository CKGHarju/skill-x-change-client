import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SkillProfile.css';
import pathParser from '../../services/pathparser';
import { User } from '../../components/'
import { fetchIdSkillActionCreator, fetchUserActionCreator } from '../../store/actions/actions';

//PATH: root/skill_id
class SkillProfile extends Component {

  componentWillMount() {
    this.initialize()
  }

  componentDidUpdate() {
    if (this.props.skill.status === 200 && this.props.user.status === 'unloaded') {
      this.props.fetchUser(this.props.skill.body.fk_user_id)
    }
  }

  componentWillUnmount() {
    this.props.clear('ID_SKILL_CLEAR');
    this.props.clear('FETCH_USER_CLEAR');
  }

  initialize = async () => {
    const skillId = (await pathParser(this.props.location.pathname)).first;
    if (!skillId) return;
    this.props.idSkill(skillId);
  }

  renderImage = () => {
    if (this.props.skill.status === 200) return <img src={this.props.skill.body.img_url} alt="Placeholder image"/>
    else return  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
  }

  render () {
    return (
      <div className="container skill-profile">
        <User user={this.props.user}></User>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  skill: state.idSkill,
  user: state.user,
  skills: state.genreSkill

});
const mapDispatchToProps = (dispatch) => ({
  idSkill: (id) => dispatch(fetchIdSkillActionCreator(id)),
  fetchUser: (id) => dispatch(fetchUserActionCreator(id)),
  clear: (actionType) => dispatch({type: actionType})
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillProfile);
