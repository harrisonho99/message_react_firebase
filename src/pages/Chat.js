import React from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import MessageForm from "../components/MessageForm";
import Progress from "../components/Progress";
import "./chats.css";
import MeCard from "../components/Card/Me";

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
        };
        this.chatRef = React.createRef();
    }

    componentDidMount = () => {
        try {
            db.ref("chats").on("value", (snapshot) => {
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
                        this.setState({ readError: null, isLoading: false });
                        if (this.chatRef?.current) {
                            const node = this.chatRef.current;
                            node.scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                    })
                    .catch((error) => {
                        this.setState({ readError: error.message });
                    });
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
    };

    handleSubmit = async (value, setSubmitting, setValues) => {
        let name = this.state.user.displayName;
        let content = value.content;
        this.setState({ writeError: null });
        db.ref("chats")
            .push({
                name,
                content,
                timestamp: Date.now(),
                uid: this.state.user.uid,
            })
            .then(() => {
                setValues({ content: "" });
                setSubmitting(false);
            })
            .then(() => {
                if (this.chatRef?.current) {
                    const node = this.chatRef.current;
                    node.scrollIntoView({
                        behavior: "smooth",
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
                <div id="chat-outer" style={{ height: "100%" }}>
                    <div id="chat-wrapper">
                        <div className="chats">
                            {this.state.chats.map((chat, index) => {
                                if (index === this.state.chats.length - 1) {
                                    return (
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
                                    );
                                }
                                return (
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
