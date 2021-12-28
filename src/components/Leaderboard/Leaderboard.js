import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "./Leaderboard.css";

class Leaderboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: [],
    };
  }

  componentDidMount() {
    const { users } = this.props;
    const usernames = Object.keys(users);

    let leaderboard = usernames.map((name) => {
      const userDetails = users[name];
      return {
        id: userDetails.id,
        name: userDetails.name,
        avatarURL: userDetails.avatarURL,
        answersPosted: Object.keys(userDetails.answers).length,
        questionsPosted: userDetails.questions.length,
      };
    }).sort(function (l1, l2) {
      return (
        l2.answersPosted +
        l2.questionsPosted -
        (l1.answersPosted + l1.questionsPosted)
      );
    });
    this.setState({ leaderboard });
  }

  render() {
    const { leaderboard } = this.state;

    return (
      <div>
        {(leaderboard || []).map((leader) => (
          <Card key={leader.name} className="leaderCard">
            <CardContent>
              <div className="leaderContent">
                <img src={leader.avatarURL} alt={leader.name} />
                <div className="leaderDetails">
                  <Typography variant="h6">{leader.name}</Typography>
                  <Typography color="textSecondary">
                    {`Questions Asked:    ${leader.questionsPosted}`}
                  </Typography>
                  <Typography color="textSecondary">
                    {`Questions Answered: ${leader.answersPosted}`}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    users: state.user.users,
  }),
  {}
)(Leaderboard);
