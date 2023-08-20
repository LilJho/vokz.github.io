import { supabase } from "./supabaseConfig";

class DatabaseServices {
  supabase;

  constructor(tableName: string) {
    this.supabase = supabase.from(tableName);
  }

  getAll = async () => {
    const { data, error } = await this.supabase.select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  getWhere = async (column: string, value: string) => {
    const { data, error } = await this.supabase.select("*").eq(column, value);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  getOne = async (column: string = "id", id: string) => {
    const { data, error } = await this.supabase.select("*").eq(column, id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  getOneWhere = async (column: string, value: any, targetColumn: string) => {
    console.log('submitted params',value); 

    const { data, error } = await this.supabase.select(targetColumn).eq(column, value);
    if (error) {
      throw new Error(error.message);
    }
    return data; 
  };

  create = async (insert: any) => {
    const { data, error } = await this.supabase.insert(insert).select();

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    return data;
  };

  update = async (id: string, update: any, columnName = "id") => {
    const { data, error } = await this.supabase
      .update(update)
      .eq(columnName, id)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  delete = async (id: string, columnName = "id") => {
    const { error } = await this.supabase.delete().eq(columnName, id);

    if (error) {
      throw new Error(error.message);
    }
    return "Deleted";
  };
}

export const PatientsActivityService = new DatabaseServices(
  "patients_activity"
);

export const DailyActivitiesService = new DatabaseServices("daily_activities");

export const DailyDiagnosisService = new DatabaseServices("watch_report");

export const UserAccountsService = new DatabaseServices("user_accounts");

