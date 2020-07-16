/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { Table } from "semantic-ui-react";
import { catchErrors } from "./utils/catchErrors";
import { ImportFile } from "./ImportFile";

const apiUrl = "http://127.0.0.1:8000/api/people";


export default function PeopleList() {
    const [containerState, setContainerState] = useState({
        column: null,
        data: [],
        direction: null,
    });

    // Get the list of people
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(apiUrl);
                setContainerState((prevState) => ({
                    ...prevState,
                    data: response.data.data,
                }));
            } catch (error) {
                catchErrors(error);
            }
        }
        getData();
    }, []);


    const handleSort = (clickedColumn) => {
        const { column, data, direction } = containerState;
        if (column !== clickedColumn) {
            setContainerState((prevState) => ({
                ...prevState,
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: "ascending",
            }));
            return;
        }

        setContainerState((prevState) => ({
            ...prevState,
            data: data.reverse(),
            direction: direction === "ascending" ? "descending" : "ascending",
        }));
    };
    const { column, data, direction } = containerState;

    return (
        <>
        <ImportFile />

        <Table sortable celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === "first_name" ? direction : null}
                        onClick={() => handleSort("first_name")}
                        singleLine
                    >
                        First Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === "last_name" ? direction : null}
                        onClick={() => handleSort("last_name")}
                        singleLine
                    >
                        Last Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === "email_address" ? direction : null}
                        onClick={() => handleSort("email_address")}
                        singleLine
                    >
                        Email
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === "status" ? direction : null}
                        onClick={() => handleSort("status")}
                        singleLine
                    >
                        Status
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === "group" ? direction : null}
                        onClick={() => handleSort("group")}
                        singleLine
                    >
                        Group
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            {data &&
            <Table.Body>
                {data.map(i => {
                    return (
                        <Table.Row key={i.id}>
                            <Table.Cell singleLine>{ i.first_name }</Table.Cell>
                            <Table.Cell singleLine>{ i.last_name }</Table.Cell>
                            <Table.Cell singleLine>{ i.email_address }</Table.Cell>
                            <Table.Cell singleLine>{ i.status }</Table.Cell>
                            <Table.Cell singleLine>{ i.group_id && i.group.group_name }</Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
            }
        </Table>
        </>
    );
}
