const DurationsManager = require("../DurationsManager.js");

test("DurationsManager: add 3 + getLastDuration",() => {
    let durationsManager = new DurationsManager(5);
    durationsManager.add("a","b",10);
    durationsManager.add("a","b", 20);
    durationsManager.add("a","c", 30);
    expect(durationsManager.getLastDuration("a","b")).toEqual(20);
    expect(durationsManager.getLastDuration("a","c")).toEqual(30);
});

test("DurationsManager: add 7 + getLastDuration",() => {
    let durationsManager = new DurationsManager(5);
    durationsManager.add("a","b",10);
    durationsManager.add("a","b", 20);
    durationsManager.add("a","b", 30);
    durationsManager.add("a","b", 40);
    durationsManager.add("a","b", 50);
    durationsManager.add("a","b", 60);
    durationsManager.add("a","b", 70);
    expect(durationsManager.getLastDuration("a","b")).toEqual(70);
});

test("DurationsManager: add 7 + getLastHistory",() => {
    let durationsManager = new DurationsManager(5);
    durationsManager.add("a","b",10);
    durationsManager.add("a","b", 20);
    durationsManager.add("a","b", 30);
    durationsManager.add("a","b", 40);
    durationsManager.add("a","b", 50);
    durationsManager.add("a","b", 60);
    durationsManager.add("a","b", 70);
    expect(durationsManager.getLastHistory("a","b")[0]).toEqual(30);
    expect(durationsManager.getLastHistory("a","b").length).toEqual(5);
});