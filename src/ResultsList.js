/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "semantic-ui-react";
import { catchErrors } from "./utils/catchErrors";

const apiURL = "http://127.0.0.1:8000/api";


export default function ResultsList() {
    const [peopleList, setPeopleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // eslint-disable-line no-unused-vars

    // Get the list of people
    useEffect(() => {
        async function getPeopleList() {
            try {
                const response = await axios.get(`${apiURL}/people`);
                setPeopleList(response.data.data);
            } catch (error) {
                catchErrors(error);
            } finally {
                setIsLoading(false);
            }
        }
        getPeopleList();
    }, []);

    return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            { peopleList &&
            <Table.Body>
                {peopleList.map((i) => {
                    return (
                        <Table.Row key={i.id}>
                            <Table.Cell singleLine>{ i.first_name }</Table.Cell>
                            <Table.Cell singleLine>{ i.last_name }</Table.Cell>
                            <Table.Cell singleLine>{ i.email_address }</Table.Cell>
                            <Table.Cell singleLine>{ i.status }</Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
            }
        </Table>
    );
}
