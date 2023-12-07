using ProbaReact.Data;
using ProbaReact.Models;
using ProbaReact.Services.Interfaces;
using System.Reflection;

namespace ProbaReact.Services
{
    public class ToDoListService : IToDoListService
    {
        private MyDataContext _dataContext;
        public ToDoListService(MyDataContext dataContext) {
            _dataContext = dataContext;
        }
        public ToDoListModel Create(ToDoListModel model)
        {
            var lastPost = _dataContext.ToDoLists.LastOrDefault();
            int newId = lastPost is null ? 1 : lastPost.Id + 1;

            model.Id = newId;
            _dataContext.ToDoLists.Add(model);

            return model;
        }

        public void Delete(int id)
        {
            var modelToDelete = _dataContext.ToDoLists.FirstOrDefault(x => x.Id == id);
            _dataContext?.ToDoLists.Remove(modelToDelete);
        }

        public ToDoListModel Get(int id)
        {
            return _dataContext.ToDoLists.FirstOrDefault(x => x.Id == id);
        }

        public List<ToDoListModel> Get()
        {
            return _dataContext.ToDoLists;
        }

        public ToDoListModel Update(ToDoListModel model)
        {
            var modelToUpdate = _dataContext.ToDoLists.FirstOrDefault(x => x.Id == model.Id);
            modelToUpdate.Title = model.Title;
            modelToUpdate.Description = model.Description;
            return modelToUpdate;
        }
    }
}
