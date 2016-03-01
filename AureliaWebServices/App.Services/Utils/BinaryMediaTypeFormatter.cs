﻿using App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;
using System.IO;
using System.Net.Http;
using System.Threading;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Net;

namespace App.Services.Utils
{
    public class BinaryMediaTypeFormatter : MediaTypeFormatter
    {

        private static Type _supportedType = typeof(byte[]);
        private bool _isAsync = false;

        public BinaryMediaTypeFormatter() : this(false)
        {
        }

        public BinaryMediaTypeFormatter(bool isAsync)
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/octet-stream"));
            IsAsync = isAsync;
        }

        public bool IsAsync
        {
            get { return _isAsync; }
            set { _isAsync = value; }
        }


        public override bool CanReadType(Type type)
        {
            return type == _supportedType;
        }

        public override bool CanWriteType(Type type)
        {
            return type == _supportedType;
        }

        public override Task<object> ReadFromStreamAsync(Type type, Stream readStream, HttpContent content, IFormatterLogger formatterLogger)
        {
            return base.ReadFromStreamAsync(type, readStream, content, formatterLogger);
        }

        //public override Task<object> ReadFromStreamAsync(Type type, Stream stream,
        //    HttpContentHeaders contentHeaders, IFormatterLogger formatterLogger)
        //{
        //    Task<object> readTask = GetReadTask(stream);
        //    if (_isAsync)
        //    {
        //        readTask.Start();
        //    }
        //    else
        //    {
        //        readTask.RunSynchronously();
        //    }
        //    return readTask;

        //}

        private Task<object> GetReadTask(Stream stream)
        {
            return new Task<object>(() =>
            {
                var ms = new MemoryStream();
                stream.CopyTo(ms);
                return ms.ToArray();
            });
        }

        private Task GetWriteTask(Stream stream, byte[] data)
        {
            return new Task(() =>
            {
                var ms = new MemoryStream(data);
                ms.CopyTo(stream);
            });
        }

        public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content, TransportContext transportContext)
        {
            return base.WriteToStreamAsync(type, value, writeStream, content, transportContext);
        }

        //public override Task WriteToStreamAsync(Type type, object value, Stream stream,
        //    HttpContentHeaders contentHeaders, TransportContext transportContext)
        //{

        //    if (value == null)
        //        value = new byte[0];
        //    Task writeTask = GetWriteTask(stream, (byte[])value);
        //    if (_isAsync)
        //    {
        //        writeTask.Start();
        //    }
        //    else
        //    {
        //        writeTask.RunSynchronously();
        //    }
        //    return writeTask;
        //}
    }
}