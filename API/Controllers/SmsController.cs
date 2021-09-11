using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Sms;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class SmsController : BaseApiController
    {
        private readonly DataContext _context;

        public SmsController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<SMS>>> GetSmss()
        {


            return HandleResult(await Mediator.Send(new List.Query()));


        }


        [HttpGet("{id}")]
        public async Task<ActionResult<StatusModel>> GetSms(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { id = id }));

        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatus(Guid id, SmsDto sms)
        {
            sms.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { sms  = sms }));

        }



        [HttpPost]
        public async Task<ActionResult<StatusModel>> PostStatus(SmsDto sms)
        {
            return HandleResult(await Mediator.Send(new Create.Command { sms = sms }));

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<StatusModel>> DeleteStatus(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { id = id }));

        }
    }
}
