import React from 'react';
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import MessageForm from '../components/MessageForm';
import Progress, { SmallProgress } from '../components/Progress';
import './chats.css';
import MeCard from '../components/Card/Me';
import differenceArrayByTimestamp from '../helpers/differenceArrayByTimestamp';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: auth().currentUser,
      chats: [],
      readError: null,
      writeError: null,
      chatsHeight: null,
      smallProgressRunning: true,
    };
    this.chatRef = React.createRef();

    this.chatWrapperRef = React.createRef();
    this.limit = 20;
  }
  componentDidMount = () => {
    try {
      db.ref('chats')
        .limitToLast(this.limit)
        .on('value', (snapshot) => {
          let chats = [];
          const pushSnap = async () => {
            return await snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
          };
          pushSnap()
            .then(() => {
              this.setState({ chats });
            })
            .then(() => {
              this.setState({
                readError: null,
                isLoading: false,
                smallProgressRunning: false,
              });
              if (this.chatRef?.current) {
                const node = this.chatRef.current;
                node.scrollIntoView({
                  behavior: 'smooth',
                });
              }
              this.handleFirstRefDisplaying();
            })
            .catch((error) => {
              this.setState({ readError: error.message });
            });
        });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  };

  handleFirstRefDisplaying = () => {
    if (this.chatWrapperRef.current) {
      let lastMessage = this.chatRef;
      let wrapper = this.chatWrapperRef.current;
      wrapper.onscroll = () => {
        let chats = [];
        if (wrapper.scrollTop === 0) {
          const handleFetchContent = () => {
            db.ref('chats')
              .limitToLast((this.limit += 10))
              .once('value', (snapshot) => {
                const appendSnap = async () => {
                  return await snapshot.forEach((snap) => {
                    chats.push(snap.val());
                  });
                };

                appendSnap()
                  .then(() => {
                    if (this.lastChatsLength === chats.length) {
                      wrapper.scrollTo(0, 0);
                      this.setState({ smallProgressRunning: false });
                      return null;
                    }
                    this.lastChatsLength = chats.length;

                    let updatedContent = differenceArrayByTimestamp(
                      this.state.chats,
                      chats
                    );
                    this.differNum = updatedContent.length;
                    // set content fetched and remove loading icon
                    return new Promise((res, rej) => {
                      setTimeout(() => {
                        this.setState((currentState) => {
                          return {
                            chats: [...updatedContent, ...currentState.chats],
                            smallProgressRunning: false,
                          };
                        });
                        res('done');
                      }, 300);
                    });
                  })
                  .then((e) => {
                    //change  defaault browser behavior when append content to top
                    if (e) {
                      lastMessage.scrollIntoView();
                      // wrapper.scrollTo(0, wrapper.offsetHeight);
                    }
                  })
                  .catch((error) => {
                    this.setState({ readError: error.message });
                  });
              });
          };
          handleFetchContent();
        }
      };
    }
  };
  componentWillUnmount() {}
  handleSubmit = async (value, setSubmitting, setValues) => {
    let name = this.state.user.displayName;
    let content = value.content;
    this.setState({ writeError: null });
    db.ref('chats')
      .push({
        name,
        content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      })
      .then(() => {
        setValues({ content: '' });
        setSubmitting(false);
      })
      .then(() => {
        if (this.chatRef?.current) {
          const node = this.chatRef.current;
          node.scrollIntoView({
            behavior: 'smooth',
          });
        }
      })
      .catch((error) => {
        this.setState({ writeError: error.message });
      });
  };

  render() {
    return this.state.isLoading ? (
      <Progress />
    ) : (
      <>
        <div id='chat-outer' style={{ height: '100%' }}>
          <div id='chat-wrapper' ref={this.chatWrapperRef}>
            <div className='chats'>
              {this.state.smallProgressRunning ? <SmallProgress /> : null}

              {this.state.chats.map((chat, index) => {
                // set ref to scroll when new meesage appear

                return index === this.state.chats.length - 1 ? (
                  <MeCard
                    name={chat.name}
                    currentUid={this.state.user.uid}
                    uid={chat.uid}
                    ref={this.chatRef}
                    key={chat.timestamp}
                    email={this.state.user.email}
                    textContent={chat.content}
                    timestamp={chat.timestamp}
                  />
                ) : (
                  <MeCard
                    name={chat.name}
                    currentUid={this.state.user.uid}
                    uid={chat.uid}
                    timestamp={chat.timestamp}
                    key={chat.timestamp}
                    email={this.state.user.email}
                    textContent={chat.content}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <MessageForm onFormSubmit={this.handleSubmit} />
      </>
    );
  }
}
