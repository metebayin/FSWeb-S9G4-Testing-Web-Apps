import React from 'react';
import {fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';
import { click } from '@testing-library/user-event/dist/click';

beforeEach(() => {
    render(<IletisimFormu />);  
})

test('hata olmadan render ediliyor', () => {
    
});

test('iletişim formu headerı render ediliyor', () => {
   
    screen.getByText("İletişim Formu");
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput,"1234");

    screen.getByText("Hata: ad en az 5 karakter olmalıdır.");
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
const submit = screen.getByTestId("submit-btn");
fireEvent.click(submit);

screen.getByTestId("ad-error");
screen.getByTestId("soyad-error");
screen.getByTestId("email-error");

}); 

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "Dilek");
   
    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput,"Bayın");

    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    screen.getByTestId("email-error");
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput,"metebayin@gmail");

    screen.getByText("Hata: email geçerli bir email adresi olmalıdır.");
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    screen.getByText("Hata: soyad gereklidir.");
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "Dilek");

    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput, "Dilek");

    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput, "mete@xxx.com");

    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    const adError = screen.queryByTestId("ad-error");
    const soyadError = screen.queryByTestId("soyad-error");
    const emailError = screen.queryByTestId("email-error");

    expect(adError).toBeNull();
    expect(soyadError).toBeNull();
    expect(emailError).toBeNull();
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "dilek");

    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput, "dilek");

    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput, "mete@xxx.com");

    const mesajInput = screen.getByTestId("mesaj-input");
    userEvent.type(mesajInput, "test yazmak çok işlevsel...");

    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    const gDiv = screen.getByTestId("goruntule-div");
    expect(gDiv).toBeInTheDocument();

});
