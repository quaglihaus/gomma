import pandas as pd
import datetime
import os

def calculate_hourly_mean(fromtime, totime):

    fromtimeDT = datetime.datetime.strptime(fromtime, "%Y-%m-%dT%H:%M:%S")
    totimeDT = datetime.datetime.strptime(totime, "%Y-%m-%dT%H:%M:%S")
    print("fromtimeDT", fromtimeDT, "totimeDT", totimeDT)

    project_absolute_path = os.path.abspath("") + "/"

    # importing csv files into df
    df_batch_registry = pd.read_csv(project_absolute_path + "/constructed/new_batch_registry.csv", sep=";")
    df_cooking_metrics = pd.read_csv(project_absolute_path + "/constructed/new_cooking_metrics.csv", sep=";")
    df_faulty_intervals = pd.read_csv(project_absolute_path + "/constructed/new_faulty_intervals.csv", sep=";")

    # filtering cooking metrics and faulty intervals for machine m1
    df_cooking_metrics = df_cooking_metrics[df_cooking_metrics["machine_id"] == "m1"]
    df_faulty_intervals = df_faulty_intervals[df_faulty_intervals["machine_id"] == "m1"]

    # merging batch registry into cooking metrics so we'll have only one df to look at
    df_cooking_metrics = df_cooking_metrics.merge(df_batch_registry, how="left", on="batch_id")

    # filtering cooking metrics for machina m1 and arepas a1
    df_cooking_metrics = df_cooking_metrics[df_cooking_metrics["arepa_type"] == "a1"]

    # Convert the date columns to datetime
    df_cooking_metrics["timestamp"] = pd.to_datetime(df_cooking_metrics["timestamp"])
    df_faulty_intervals["start_time"] = pd.to_datetime(df_faulty_intervals["start_time"])
    df_faulty_intervals["end_time"] = pd.to_datetime(df_faulty_intervals["end_time"])

    # further filter dfs based on date
    df_cooking_metrics = df_cooking_metrics[(df_cooking_metrics["timestamp"] > fromtimeDT) & (df_cooking_metrics["timestamp"] < totimeDT)]
    df_faulty_interval = df_faulty_intervals[(df_faulty_intervals["start_time"] < totimeDT) & (df_faulty_intervals["end_time"] > fromtimeDT)]

    # filter out all timestamps happened during a faulty interval
    df_cooking_metrics = df_cooking_metrics[~df_cooking_metrics["timestamp"].apply(lambda x: any(b <= x <= c for b, c in zip(df_faulty_interval["start_time"], df_faulty_interval["end_time"])))]

    #lastly let's make the numeric column as... numeric
    print(df_cooking_metrics.to_string())
    df_cooking_metrics["metric_1"] = df_cooking_metrics["metric_1"].str.replace(',', '.').astype(float).round(4)
    df_cooking_metrics["metric_2"] = df_cooking_metrics["metric_2"].str.replace(',', '.').astype(float).round(4)

    #now that we finally have the definitive cooking metrics, let's group it by hour and calculate the mean for each group
    df_hourly_averaged_metrics = df_cooking_metrics.groupby([df_cooking_metrics["timestamp"].dt.date, df_cooking_metrics["timestamp"].dt.hour])[["metric_1", "metric_2"]].mean()

    print(df_hourly_averaged_metrics)
    return df_hourly_averaged_metrics
