using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProbaReact.Models;
using ProbaReact.Services.Interfaces;
using System.Reflection;

namespace ProbaReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoListController : ControllerBase
    {
        private readonly IToDoListService _todoListService;

        public ToDoListController(IToDoListService toDoListService)
        {
               _todoListService = toDoListService;
        }
        [HttpPost]
        public ToDoListModel Create (ToDoListModel model) { 
           return _todoListService.Create(model);
        }
        [HttpPatch]
        public object Update (ToDoListModel model) {
            return _todoListService.Update(model);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete (int id) {
            _todoListService.Delete(id);
            return Ok();
        }
        [HttpGet("{id}")]
        public ToDoListModel Get(int id) {
            return _todoListService.Get(id);
        }
        [HttpGet]
        public IEnumerable<ToDoListModel> GetAll() {
            return _todoListService.Get();
        }
    }
}
