/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import GroupsList from "./GroupsList";

let wrapper;

const data = [{
    "id": 1,
    "group_name": "Volunteers",
    "people": [{
        "id": 132,
        "first_name": "Macie",
        "last_name": "Emmerich",
        "email_address": "cremin.marjory@hotmail.com",
        "status": "active",
        "group_id": 1,
        "updated_at": "2019-07-20 22:05:47",
        "created_at": "2019-07-20 22:05:47",
    }],
    "updated_at": "2019-07-21 22:05:47",
    "created_at": "2019-07-21 22:05:47",
}];

describe("<GroupsList />", () => {

    beforeAll(() => {
        wrapper = shallow(<GroupsList jestData={data} />);
    });

    test("should match the snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
