/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { Table, List } from "semantic-ui-react";
import { catchErrors } from "./utils/catchErrors";

const apiUrl = "http://127.0.0.1:8000/api/groups";


export default function GroupsList({jestData}) {
    const [containerState, setContainerState] = useState({
        column: null,
        data: [],
        direction: null,
    });

    // Get the list of groups
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

    // If we are using Jest, use the 'jestData' prop to load test data
    let groupsData = data;
    if (jestData) {
        groupsData = jestData;
    }

    return (
        <Table sortable celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === "name" ? direction : null}
                        onClick={() => handleSort("name")}
                        singleLine
                    >
                        Group Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === "people" ? direction : null}
                        onClick={() => handleSort("people")}
                        singleLine
                    >
                        People
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            {groupsData &&
            <Table.Body>
                {/* Map through groups */}
                {groupsData.map(g => {
                    return (
                        <Table.Row key={g.id}>
                            <Table.Cell singleLine>{ g.group_name }</Table.Cell>

                            {/* Map through a group's people and show active */}
                            <Table.Cell singleLine>
                                {g.people.length > 0 && (
                                    <List>
                                        {g.people.map(p => {
                                            if (p.status === "active") {
                                                return (
                                                    <List.Item key={p.id}>
                                                        {p.first_name} {p.last_name}
                                                    </List.Item>
                                                );
                                            }
                                            return null;
                                        })}
                                    </List>
                                )}
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
            }
        </Table>
    );
}
