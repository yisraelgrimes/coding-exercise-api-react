import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, Tab } from "semantic-ui-react";

import { ImportFile } from "./ImportFile";
import PeopleList from "./PeopleList";
import GroupsList from "./GroupsList";

const panes = [
    { menuItem: "People", render: () => <Tab.Pane><PeopleList /></Tab.Pane> },
    { menuItem: "Groups", render: () => <Tab.Pane><GroupsList /></Tab.Pane> },
];

const App = ({ children }) => (
    <Container style={{ margin: 20 }}>
        <Header as="h3" floated="left"><span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>
        <ImportFile />

        {children}
    </Container>
);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
    <App>
        <Tab panes={panes} />
    </App>,
    document.getElementById("root")
);
