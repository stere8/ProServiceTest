namespace TaskManagerBackend
{
    /// <summary>
    /// Central place for all small enums used by the domain model.
    /// </summary>
    public static class Enums
    {
        public enum TaskType
        {
            Implementation = 0,
            Deployment = 1,
            Maintenance = 2,
        }

        public enum ImplementationStatus
        {
            ToBeDone = 0,
            Completed = 1,
        }

        public enum UserType
        {
            DevOpsAdministrator = 0,
            Programmer = 1,
        }
        public enum TaskStatus
        {
            ToDo = 0,
            Done = 1
        }

    }
}
