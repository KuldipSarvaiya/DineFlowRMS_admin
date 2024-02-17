import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside id="sidebar" class="sidebar">
      <ul class="sidebar-nav" id="sidebar-nav">
        {/* home */}
        <li class="nav-item">
          <Link class="nav-link collapsed" to="/">
            <i class="bi bi-house"></i>
            <span>Home</span>
          </Link>
        </li>

        {/* menu */}
        <li class="nav-item">
          <Link class="nav-link collapsed" to="/menu">
            <i class="bi bi-bag"></i>
            <span>Menu</span>
          </Link>
        </li>

        {/* bills */}
        <li class="nav-item">
          <Link class="nav-link collapsed" to="/bills">
            <i class="bi bi-coin"></i>
            <span>Bills</span>
          </Link>
        </li>

        {/* users */}
        <li class="nav-item">
          <a
            class="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i class="bi bi-person"></i>
            <span>Users</span>
            <i class="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="components-nav"
            class="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="/users_managers">
                <i class="bi bi-circle"></i>
                <span>Managers</span>
              </a>
            </li>
            <li>
              <a href="/users_waiters">
                <i class="bi bi-circle"></i>
                <span>Waiters</span>
              </a>
            </li>
            <li>
              <a href="/users_chefs">
                <i class="bi bi-circle"></i>
                <span>Chefs</span>
              </a>
            </li>
            <li>
              <a href="/users_customers">
                <i class="bi bi-circle"></i>
                <span>Customers</span>
              </a>
            </li>
          </ul>
        </li>

        {/* tables */}
        <li class="nav-item">
          <a
            class="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i class="bi bi-layout-text-window-reverse"></i>
            <span>Tables</span>
            <i class="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            class="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="/table_details">
                <i class="bi bi-circle"></i>
                <span>Manage</span>
              </a>
            </li>
            <li>
              <a href="/table_bookings">
                <i class="bi bi-circle"></i>
                <span>Bookings</span>
              </a>
            </li>
          </ul>
        </li>

        {/* orders */}
        <li class="nav-item">
          <a
            class="nav-link collapsed"
            data-bs-target="#icons-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i class="bi bi-gem"></i>
            <span>Orders</span>
            <i class="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="icons-nav"
            class="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="/orders_past">
                <i class="bi bi-circle"></i>
                <span>Past</span>
              </a>
            </li>
            <li>
              <a href="/orders_current">
                <i class="bi bi-circle"></i>
                <span>Current</span>
              </a>
            </li>
            {/* <li>
              <a href="/orders_future">
                <i class="bi bi-circle"></i>
                <span>Future</span>
              </a>
            </li> */}
          </ul>
        </li>
        
        {/* feedback */}
        <li class="nav-item">
          <Link class="nav-link collapsed" to="/feedback">
            <i class="bi bi-chat"></i>
            <span>Feedback</span>
          </Link>
        </li>

      </ul>
    </aside>
  );
}
