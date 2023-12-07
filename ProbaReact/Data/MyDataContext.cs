using ProbaReact.Models;

namespace ProbaReact.Data
{
    public class MyDataContext
    {
        public List<ToDoListModel> ToDoLists { get; set; }
        public MyDataContext() {
            ToDoLists = new List<ToDoListModel>();
        }
    }
}
