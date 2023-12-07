using Microsoft.AspNetCore.Mvc;
using ProbaReact.Models;

namespace ProbaReact.Services.Interfaces
{
    public interface IToDoListService
    {
        ToDoListModel Create(ToDoListModel model);
        ToDoListModel Update(ToDoListModel model);
        void Delete(int id);
        ToDoListModel Get(int id);
        List<ToDoListModel> Get();
    }
}
